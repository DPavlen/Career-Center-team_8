import csv

from django.core.management.base import BaseCommand

from candidates.models import Education


class Command(BaseCommand):
    """Загрузка 'Образование кандидата' в базу из csv файла, 
    который располагается в директории /data/... ."""
    def handle(self, *args, **kwargs):
        try:
            with open("data/education.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for row in reader:
                    Education.objects.get_or_create(name=row[0],
                                            education_level=row[1], 
                                            date_start=row[2],
                                            date_graduation=row[3],
                                            name_university=row[4],
                                            faculty=row[5],
                                            specialization=row[6],
                                            slug=row[7])
        except Exception:
            raise ("Ошибка при загрузке 'Образование кандидата':") 
        return ("Загрузка 'Образование кандидата' произошла успешно!"
                " Обработка файла education.csv завершена.")
