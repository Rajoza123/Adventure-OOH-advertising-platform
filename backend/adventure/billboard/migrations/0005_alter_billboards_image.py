# Generated by Django 5.1.1 on 2024-09-16 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billboard', '0004_alter_billboards_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='billboards',
            name='image',
            field=models.ImageField(null=True, upload_to='billboard/image'),
        ),
    ]
