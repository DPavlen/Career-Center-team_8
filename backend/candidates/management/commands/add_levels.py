import csv

from django.core.management.base import BaseCommand

from candidates.models import Level


class Command(BaseCommand):
    """Загрузка 'Уровень кандидата' в базу из csv файла, 
    который располагается в директории /data/... ."""
    def handle(self, *args, **kwargs):
        try:
            with open("data/levels.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for name, slug in reader:
                    Level.objects.get_or_create(name=name, slug=slug)
        except Exception:
            raise ("Ошибка при загрузке файла уровень кандидата:") 
        return ("Загрузка 'Уровень кандидата' произошла успешно!"
                " Обработка файла levels.csv завершена.")
