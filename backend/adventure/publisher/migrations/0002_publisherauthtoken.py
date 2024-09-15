# Generated by Django 5.1 on 2024-09-15 09:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('publisher', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PublisherAuthToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=40, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='publisher.publishers')),
            ],
        ),
    ]
