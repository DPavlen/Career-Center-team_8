import csv

from django.core.management.base import BaseCommand

from candidates.models import Course


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        with open("data/courses.csv", encoding="utf-8-sig") as f:
            reader = csv.reader(f)
            for row in reader:
                Course.objects.get_or_create(
                    spec_id=row[0], name=row[1], slug=row[2]
                )
