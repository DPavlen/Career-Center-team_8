import csv

from django.core.management.base import BaseCommand

from candidates.models import ExperienceDetailed


class Command(BaseCommand):
    """Загрузка 'Детальный опыта работы кандидата' в базу из csv файла, 
    который располагается в директории /data/... ."""
    def handle(self, *args, **kwargs):
        try:
            with open("data/experience_detailed.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for row in reader:
                    ExperienceDetailed.objects.get_or_create(name=row[0],
                                            date_start=row[1], 
                                            date_end=row[2],
                                            post=row[3],
                                            responsibilities=row[4],
                                            slug=row[5])
        except Exception:
            raise ("Ошибка при загрузке 'Детальный опыта работы кандидата':") 
        return ("Загрузка 'Детальный опыта работы кандидата' произошла успешно!"
                " Обработка файла experience_detailed.csv завершена.")

