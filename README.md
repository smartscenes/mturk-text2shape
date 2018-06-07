# mturk-text2voxel

Get mturk-rails and follow directions to install ruby on rails and setup mturk-rails according to the mturk-rails/README.md
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