# Generated by Django 5.0.3 on 2024-08-30 07:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billboard', '0003_billxcomp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='billboards',
            name='image',
            field=models.ImageField(upload_to='billboard/image'),
        ),
    ]
