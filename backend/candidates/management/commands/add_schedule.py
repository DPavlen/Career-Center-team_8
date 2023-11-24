import csv

from django.core.management.base import BaseCommand

from candidates.models import WorkSchedule


class Command(BaseCommand):
    """Загрузка 'График работы' в базу из csv файла,
    который располагается в директории /data/... ."""

    def handle(self, *args, **kwargs):
        try:
            with open("data/schedule.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for name, slug in reader:
                    WorkSchedule.objects.update_or_create(name=name, slug=slug)
        except Exception:
            raise ("Ошибка при загрузке 'График работы':")
        return (
            "Загрузка 'График работы' произошла успешно!"
            " Обработка файла schedule.csv завершена."
        )
