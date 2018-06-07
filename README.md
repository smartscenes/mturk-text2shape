# mturk-text2voxel

Get mturk-rails and follow directions to install ruby on rails and setup mturk-rails according to the mturk-rails/README.md
```
git clone git@github.com:smartscenes/mturk-rails.git
```

```
scripts/setup.sh mturk-rails
bundle exec rake mturk:develop[model2desc]
bundle exec rake mturk:develop[verify_model_desc]
```