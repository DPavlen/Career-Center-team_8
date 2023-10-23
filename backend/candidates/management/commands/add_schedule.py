import csv

from django.core.management.base import BaseCommand

from candidates.models import WorkSchedule


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        with open("data/schedule.csv", encoding="utf-8-sig") as f:
            reader = csv.reader(f)
            for row in reader:
                WorkSchedule.objects.get_or_create(name=row[0], slug=row[1])
