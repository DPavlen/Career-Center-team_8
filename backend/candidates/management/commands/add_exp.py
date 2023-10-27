import csv

from django.core.management.base import BaseCommand

from candidates.models import Experience


class Command(BaseCommand):
    """Загрузка 'Опыт работы(в годах)' в базу из csv файла, 
    который располагается в директории /data/... ."""
    def handle(self, *args, **kwargs):
        try:
            with open("data/experience.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for name, slug in reader:
                    Experience.objects.get_or_create(name=name, slug=slug)
        except Exception:
            raise ("Ошибка при загрузке 'Опыт работы(в годах)':") 
        return ("Загрузка 'Опыт работы(в годах)' произошла успешно!"
                " Обработка файла experience.csv завершена.")