# Generated by Django 4.2.6 on 2023-10-30 11:55

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("candidates", "0003_alter_candidate_activity"),
    ]

    operations = [
        migrations.DeleteModel(
            name="DetailInCandidate",
        ),
    ]
