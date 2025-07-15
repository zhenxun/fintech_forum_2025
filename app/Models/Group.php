<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model
{
    use HasFactory,SoftDeletes;
    protected $table='group';

    public function member(){
        return $this->hasMany(Member::class,'group','id')->where('show',1)->orderBy('order','asc');
    }

    public static function locale($locale){
        $group=Group::with('member')->get();
        foreach($group as $item){
            if($locale){
                $item['name']=$item['english_name'];
            }else{
                $item['name']=$item['chinese_name'];
            }
            foreach($item->member as $value){
                $value=$value->group_locale($locale);
            }
        }
        return $group;
    }
}
