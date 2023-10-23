import csv

from django.core.management.base import BaseCommand

from candidates.models import EmploymentType


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        with open("data/employtype.csv", encoding="utf-8-sig") as f:
            reader = csv.reader(f)
            for row in reader:
                EmploymentType.objects.get_or_create(name=row[0], slug=row[1])
