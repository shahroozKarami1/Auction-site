# Generated by Django 5.0.3 on 2024-10-23 18:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_remove_productcategory_href'),
    ]

    operations = [
        migrations.CreateModel(
            name='WallBanners',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated_at', models.DateTimeField(auto_created=True, auto_now=True)),
                ('created_at', models.DateTimeField(auto_created=True, auto_now_add=True)),
                ('is_archived', models.BooleanField(default=False)),
                ('banner', models.ImageField(upload_to='banners')),
                ('title', models.CharField(max_length=250)),
                ('description', models.CharField(max_length=250)),
                ('product_url', models.CharField(blank=True, max_length=500, null=True)),
                ('is_main', models.BooleanField(default=False)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.productcategory')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
