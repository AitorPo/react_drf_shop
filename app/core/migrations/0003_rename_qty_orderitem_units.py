# Generated by Django 3.2.9 on 2021-11-20 19:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_product_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderitem',
            old_name='qty',
            new_name='units',
        ),
    ]
