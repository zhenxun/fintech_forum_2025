<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Agenda extends Model
{
    use HasFactory,SoftDeletes;
    protected $table='agenda';

    public function speakers($id,$locale){
        $speaker=Speaker::where('id',$id)->where('show',1)->first();
        if($speaker){
            if($locale){
                $speaker['name']=$speaker['english_name'];
                $speaker['title']=$speaker['english_title'];
            }else{
                $speaker['name']=$speaker['chinese_name'];
                $speaker['title']=$speaker['chinese_title'];
            }
            return $speaker;
        }

        return null;
        
    }

    public static function locale($locale){
        $agenda=Agenda::where('show',1)->orderBy('order','asc')->get();
        if($locale){
            foreach ($agenda as $value) {
                if($value['english_title']){
                    $value['title']=$value['english_title'];
                }else{
                    $value['title']=$value['chinese_title'];
                }

                if($value['english_subtitle']){
                    $value['subtitle']=$value['english_subtitle'];
                }else{
                    $value['subtitle']=$value['chinese_subtitle'];
                }

                if($value['speaker']){
                    $value['subtitle']=$value['english_subtitle'];
                }else{
                    $value['subtitle']=$value['chinese_subtitle'];
                }
            }
        }else{
            foreach ($agenda as $value) {
                $value['title']=$value['chinese_title'];
                $value['subtitle']=$value['chinese_subtitle'];
            }
        }

        foreach($agenda as $item){
            if($item->speaker!=null){
                $agenda_speaker=json_decode($item->speaker);
                foreach($agenda_speaker as $element){
                    $temp=array();
                    if($locale){
                        $element->title=$element->english_title;
                        $element->thema=$element->english_thema;
                    }else{
                        $element->title=$element->chinese_title;
                        $element->thema=$element->chinese_thema;
                    }
                    foreach($element->member as $key=>$value){
                        array_push($temp,$item->speakers($value,$locale));
                    }
                    $element->member=$temp;
                }
                $item['speaker']=$agenda_speaker;
            }else{
                $item['speaker']=null;
            }
        }
        return $agenda;        
    }
}
