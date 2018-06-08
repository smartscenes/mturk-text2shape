class Experiments::VerifyModelDescController < ApplicationController
  require 'action_view'

  include ActionView::Helpers::DateHelper
  include MturkHelper
  include Experiments::ExperimentsHelper

  before_action :load_new_tab_params, only: [:index]
  before_action :load_data_generic, only: [:index]
  before_action :estimate_task_time, only: [:index]

  before_action :can_view_tasks_filter, only: [:results, :view]
  before_action :retrieve_list, only: [:results]
  before_action :retrieve_item, only: [:view, :load]

  layout 'basic', only: [:index]

  def index
      if @entries.any? then
        # Convert entries
        read_model_list
        nChoices = @conf['nChoices']
        @entries = @entries.map { |x|
          data = JSON.parse(x['data'])
          entry = data['entry']
          # Get distractors
          distractors = select_distractors(@models_by_category, entry['id'], entry['category'], nChoices-1)
          distractors = distractors.map{|m| m['id']}
          # Add entry to distractors and then shuffle
          distractors.push(entry['id'])
          distractors.shuffle!
          # Find index that is correct
          correctIndex = distractors.index(entry['id'])
          if !@conf.key?('imagePatternUrl')
            distractors = distractors.map{|id| { id: id, url: getImageUrl(id, 13) }}
          end
          # Populate final entry as task would expect it
          res = {
              id: x['taskName'] + '-' + x['id'].to_s,
              text: data['description'],
              correctIndex: correctIndex,
              items: distractors,
              entry: entry
          }
          res
        }
        render "experiments/select_item/index", layout: true
      else
        @message = @no_entries_message
        render "mturk/message", layout: false
      end
  end

  def results
    render "experiments/select_item/results", layout: true
  end

  def retrieve_list
    @task_name = params['task'] || params['taskName'] || controller_name
    @task = MtTask.find_by_name!(@task_name)
    @completed = get_completed_items(@task.id)
  end

private
  def read_model_list
    if @conf.key?('modelsFile')
      @models = load_generic_entries(@conf['modelsFile'])
      @models_by_category = @models.group_by{|m| m['category']}
    else
      logger.error('Please specify modelsFile in the configuration file for your task')
    end
  end

  def select_distractors(models_by_category, id, category, n)
    #logger.info(models_by_category)
    catModels = models_by_category[category]
    if catModels
      selected = select_random(catModels, n+1)
      selected.select{ |m| m['id'] != id }.take(n)
    else
      logger.error('Cannot select distractors for category:' + category)
      return false
    end
  end
end
