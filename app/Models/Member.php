<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends Model
{
    use HasFactory,SoftDeletes;
    protected $table='member';

    public function groups(){
        return $this->belongsTo(Group::class,'group','id');
    }

    public function group_locale($locale){
        $member=$this;
        if($locale){
            $member['name']=$member['english_name'];
            $member['title']=$member['english_title'];
        }else{
            $member['name']=$member['chinese_name'];
            $member['title']=$member['chinese_title'];
        }
        return $member;        
    }

    public static function locale($locale){
        $member=Member::where('show',1)->orderBy('order','asc')->get();
        if($locale){
            foreach ($member as $key => $value) {
                $value['name']=$value['english_name'];
                $value['title']=$value['english_title'];
            }
        }else{
            foreach ($member as $key => $value) {
                $value['name']=$value['chinese_name'];
                $value['title']=$value['chinese_title'];
            }
        }
        return $member;        
    }
}
