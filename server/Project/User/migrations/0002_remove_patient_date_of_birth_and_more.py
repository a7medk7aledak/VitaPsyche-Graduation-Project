# Generated by Django 5.1.1 on 2024-10-06 19:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='date_of_birth',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='medical_history',
        ),
    ]
