#!/bin/bash

script_dir="`dirname \"$0\"`"

tgt_dir=$1
src_dir=${2:-$script_dir/../experiments}

if [ -z "$tgt_dir" ]; then
	echo "Usage: setup.sh <target_dir>"
	echo "Please specify the target directory to link to"
	exit 1
fi

function link_files {
  dir1=$1
  dir2=$2
  if [ -d "$dir1" ]; then
  	if [ ! -d "$dir2" ]; then
  		mkdir -p "$dir2"
  	fi
  	if [ -d "$dir2" ]; then
		absdir1="$( cd "$dir1" && pwd )"
	  	for f in $(ls -d ${absdir1}/*); do
	  		echo "ln -s $f $dir2" 
	  		ln -sf $f "$dir2"
	  	done
	else
		echo "No target directory $dir2"
	fi
  fi
}

function link_dir {
  dir1=$1
  dir2=$2	
  absdir1="$( cd "$dir1" && pwd )"
  echo "ln -s $absdir1 $dir2" 
  ln -sf "$absdir1" "$dir2"
}


function link_experiment {
	expr_dir=$1
	expr_name="`basename $1`"
	echo "linking files for experiment in $expr_dir to $tgt_dir with name $expr_name"
	link_files "$expr_dir/app/controllers"  "$tgt_dir/app/controllers/experiments" 
	link_files "$expr_dir/app/helpers"  "$tgt_dir/app/helpers/experiments" 
	link_dir "$expr_dir/app/views"  "$tgt_dir/app/views/experiments/$expr_name"
	link_dir "$expr_dir/javascript"  "$tgt_dir/app/assets/javascripts/experiments/$expr_name" 
	link_files "$expr_dir/config"  "$tgt_dir/config/experiments" 
	link_dir "$expr_dir/public"  "$tgt_dir/public/experiments/$expr_name" 
}

for f in $(ls -d ${src_dir}/*); do
	link_experiment $f 
done
