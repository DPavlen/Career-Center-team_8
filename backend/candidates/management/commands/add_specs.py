import csv

from django.core.management.base import BaseCommand

from candidates.models import Specialization


class Command(BaseCommand):
    """Загрузка 'Направления специальности' в базу из csv файла,
    который располагается в директории /data/... ."""

    def handle(self, *args, **kwargs):
        try:
            with open("data/proff.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for name, slug in reader:
                    Specialization.objects.get_or_create(name=name, slug=slug)
        except Exception:
            raise ("Ошибка при загрузке 'Направления специальности':")
        return (
            "Загрузка 'Направления специальности' произошла успешно!"
            " Обработка файла proff.csv завершена."
        )
