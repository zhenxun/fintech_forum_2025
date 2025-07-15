<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Speaker extends Model
{
    use HasFactory,SoftDeletes;
    protected $table='speakers';

    public static function locale($locale){
        $speaker=Speaker::where('show',1)->where('keynote',1)->orderBy('order','asc')->get();
        if($locale){
            foreach ($speaker as $key => $value) {
                $value['name']=$value['english_name'];
                $value['title']=$value['english_title'];
                $value['thema']=$value['english_thema'];
            }
        }else{
            foreach ($speaker as $key => $value) {
                $value['name']=$value['chinese_name'];
                $value['title']=$value['chinese_title'];
                $value['thema']=$value['chinese_thema'];
            }
        }
        return $speaker;        
    }

    public static function committee_locale($locale){
        $speaker=Speaker::where('show',1)->where('keynote',0)->orderBy('order','asc')->get();
        if($locale){
            foreach ($speaker as $key => $value) {
                $value['name']=$value['english_name'];
                $value['title']=$value['english_title'];
            }
        }else{
            foreach ($speaker as $key => $value) {
                $value['name']=$value['chinese_name'];
                $value['title']=$value['chinese_title'];
                $value['thema']=$value['chinese_thema'];
            }
        }
        return $speaker;        
    }
}
