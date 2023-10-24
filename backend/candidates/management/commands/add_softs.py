import csv

from django.core.management.base import BaseCommand

from candidates.models import Soft


class Command(BaseCommand):
    """Загрузка 'Cофт Cкиллов' в базу из csv файла, 
    который располагается в директории /data/... ."""
    def handle(self, *args, **kwargs):
        try:
            with open("data/softs.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for name, slug in reader:
                    Soft.objects.get_or_create(name=name, slug=slug)
                # for row in reader:
                #     Soft.objects.get_or_create(name=row[0], slug=row[1])
                print("Загрузка 'Cофт Cкиллов' произошла успешно!")
        except Exception:
            raise ("Ошибка при загрузке софт скиллов:") 
        return "Обработка файла softs.csv завершена."
