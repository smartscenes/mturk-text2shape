# mturk-text2voxel


## Getting started
Get [mturk-rails](https://github.com/smartscenes/mturk-rails) and follow directions to install ruby on rails and setup mturk-rails according to the [mturk-rails/README.md](https://github.com/smartscenes/mturk-rails/README.md)
```
git clone git@github.com:smartscenes/mturk-rails.git
```

Link experiments to mturk-rails 
```
scripts/setup.sh mturk-rails
bundle exec rake mturk:develop[model2desc]
bundle exec rake mturk:develop[verify_model_desc]
```

Add to `mturk-rails/config/routes.rb`
```
  get 'experiments/model2desc', to: 'experiments/model2desc#index'
  get 'experiments/model2desc/results', to: 'experiments/model2desc#results'

  get 'experiments/verify_model_desc', to: 'experiments/verify_model_desc#index'
  get 'experiments/verify_model_desc/results', to: 'experiments/verify_model_desc#results'
```

## Basic command to run task

To run task on Amazon MTurk
- `RAILS_ENV=production bundle exec rake mturk:run[model2desc]`

Use the mturk-rails UI to look and get your results as csv. 

You can also do the following to dump the state of the database.
- `RAILS_ENV=production rake db:data:dump` 

You can use the Amazon MTurk interface to approve and reject workers.
When done, use the following to approve and pay workers and remove the hit from Amazon MTurk.
- `RAILS_ENV=production bundle exec rake mturk:recall[model2desc]`

## Directory structure

Basic directory structure
```
- experiments                     # Mturk Experiments 
  - model2desc                    # Show a image or 3d model and ask for a description
  - verify_model_desc             # Takens model2desc output and ask user to select model matching description  
- scripts/setup.sh                # Script to symlink experiment files to main mturk-rails
```

Each experiment has the following (following the rails file structure):
```
<experiment name>
  - app
    - controller                  # App controller logic 
    - views                       # View (webpage) with instructions and UI elements
  - config                        # Configuration (task description, turker pay, csv file to use)
  - javascript                    # Javascript code for the front end
  - public                        # CSV data for the task goes here
```
