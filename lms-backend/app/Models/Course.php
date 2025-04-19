<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'instructor_id',
        'title',
        'slug',
        'description',
        'objectives',
        'thumbnail',
        'price',
        'level',
        'status',
        'duration_hours',
        'prerequisites',
        'curriculum',
        'materials',
        'is_featured',
        'max_students',
        'published_at',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'prerequisites' => 'array',
        'curriculum' => 'array',
        'materials' => 'array',
        'is_featured' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function enrollments()
    {
        return $this->hasMany(CourseEnrollment::class);
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'course_enrollments')
            ->withPivot('status', 'progress', 'completed_at')
            ->withTimestamps();
    }
}
