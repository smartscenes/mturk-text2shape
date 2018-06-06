#!/bin/bash

script_dir="`dirname \"$0\"`"

src_dir=${1:-$script_dir/../experiments}
tgt_dir=${2:-staging}

function link_files {
  dir1=$1
  dir2=$2	
  if [ -d "$dir1" ]; then
  	if [ ! -d "$dir2" ]; then
  		mkdir -p "$dir2"
  	fi
  	if [ -d "$dir2" ]; then
	  	for f in $(ls -d ${dir1}/*); do
	  		echo "ln -s $f $dir2" 
	  		ln -s $f "$dir2"
	  	done
	else
		echo "No target directory $dir2"
	fi
  fi
}

function link_experiment {
	expr_dir=$1
	echo "linking files for experiment in $expr_dir"
	link_files "$expr_dir/app/controllers"  "$tgt_dir/app/controllers/experiments" 
	link_files "$expr_dir/app/helpers"  "$tgt_dir/app/helpers/experiments" 
	link_files "$expr_dir/app/views"  "$tgt_dir/app/views/experiments"
	link_files "$expr_dir/javascript"  "$tgt_dir/app/assets/javascripts/experiments" 
	link_files "$expr_dir/config"  "$tgt_dir/config/experiments" 
	link_files "$expr_dir/public"  "$tgt_dir/public/experiments" 
}

for f in $(ls -d ${src_dir}/*); do
	link_experiment $f 
done
