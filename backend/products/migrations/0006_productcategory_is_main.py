# Generated by Django 5.0.3 on 2024-10-23 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_productcategory_href'),
    ]

    operations = [
        migrations.AddField(
            model_name='productcategory',
            name='is_main',
            field=models.BooleanField(default=False),
        ),
    ]
