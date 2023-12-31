from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from server.settings import AUTH_USER_MODEL
from .fields import OrderField

User = AUTH_USER_MODEL


class Subject(models.Model):
    """ Моделька предмета """

    title = models.CharField(max_length=200)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class Course(models.Model):
    """ Моделька курса """

    title = models.CharField(max_length=255)
    description = models.TextField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='course/')
    start_month = models.DateField()
    end_month = models.DateField()
    days_of_week = models.CharField(max_length=14)
    start_time = models.TimeField()
    end_time = models.TimeField()
    mentor = models.ForeignKey(User,
                               on_delete=models.CASCADE,
                               related_name='courses_mentor',
                               limit_choices_to={'role': 'mentor'})
    assistant = models.ForeignKey(User, on_delete=models.SET_NULL,
                                  null=True, blank=True,
                                  related_name='courses_assisting',
                                  limit_choices_to={'role': 'mentor'})
    students = models.ManyToManyField(User, related_name='courses_enrolled',
                                      limit_choices_to={'role': 'student'})
    is_completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title


class Module(models.Model):
    """ Моделька модуля внутри курса """

    course = models.ForeignKey(Course,
                               related_name='modules',
                               on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = OrderField(blank=True, for_fields=['course'])
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.order}.{self.title}'


class Content(models.Model):
    """ Моделька контента внутри модуля """

    module = models.ForeignKey(Module,
                               related_name='contents',
                               on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content_html = models.TextField()
    order = OrderField(blank=True, for_fields=['module'])
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']


class Task(models.Model):
    """ Моделька задания внутри модуля """

    module = models.ForeignKey(Module,
                               related_name='tasks',
                               on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    max_score = models.PositiveIntegerField()
    content_html = models.TextField()

    def __str__(self):
        return self.title


class Solution(models.Model):
    """ Моделька решение внутри задания """

    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'})
    is_accepted = models.BooleanField(default=False)
    order = OrderField(blank=True, for_fields=['task', 'user'])
    grade = models.PositiveIntegerField(null=True, blank=True,
                                        validators=[
                                            MinValueValidator(1, message="Баллы должны быть не меньше 1."),
                                        ])
    attachment = models.FileField(upload_to='solutions/%Y/%m/%d')
    created = models.DateTimeField(auto_now_add=True)

    def clean(self):
        super().clean()
        max_score = self.task.max_score
        if self.grade and self.grade > max_score:
            raise ValidationError(f"Баллы должны быть не больше чем максимальный балл за задание.({max_score})")

    def __str__(self):
        return f"Solution for {self.task.title} by {self.user}"


class Schedule(models.Model):
    """ Моделька расписания """

    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='schedules')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f'{self.title} | {self.date}'


class Attendance(models.Model):
    """ Моделька для отметки студентов """

    user = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'student'}, null=True)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    status = models.BooleanField(null=True)

    def __str__(self):
        return f"{self.user} - {self.schedule} ({'Present' if self.status else 'Absent'})"


class Grade(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    grade = models.DecimalField(max_digits=3, decimal_places=0)
    created = models.DateTimeField(auto_now_add=True)


class ImageUpload(models.Model):
    image = models.ImageField(upload_to='content_html/images/')
