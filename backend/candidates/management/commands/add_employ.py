import csv

from django.core.management.base import BaseCommand

from candidates.models import EmploymentType


class Command(BaseCommand):
    """Загрузка 'Типа занятости' в базу из csv файла,
    который располагается в директории /data/... ."""

    def handle(self, *args, **kwargs):
        try:
            with open("data/employtype.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for name, slug in reader:
                    EmploymentType.objects.get_or_create(name=name, slug=slug)
        except Exception:
            raise ("Ошибка при загрузке 'Типа занятости':")
        return (
            "Загрузка 'Типа занятости' произошла успешно!"
            " Обработка файла employtype.csv завершена."
        )
