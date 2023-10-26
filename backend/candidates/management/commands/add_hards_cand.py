import csv

from django.core.management.base import BaseCommand

from candidates.models import HardCands


class Command(BaseCommand):
    """Загрузка 'Хард-скиллов' в базу из csv файла, 
    который располагается в директории /data/... ."""
    def handle(self, *args, **kwargs):
        try:
            with open("data/hards_for_cands.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for row in reader:
                    HardCands.objects.get_or_create(name=row[0], slug=row[1])
        except Exception:
            raise("Ошибка при загрузке 'Хард-скиллов'")
        return ("Загрузка 'Хард-скиллов' произошла успешно! " 
                " Обработка файла hards_for_cands.csv завершена.")
