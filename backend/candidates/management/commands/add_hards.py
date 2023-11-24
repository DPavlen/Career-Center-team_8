import csv

from django.core.management.base import BaseCommand

from vacancies.models import Hard


class Command(BaseCommand):
    """Загрузка 'Направления специальности c Хард-скилом' в базу из csv файла,
    который располагается в директории /data/... ."""

    def handle(self, *args, **kwargs):
        try:
            with open("data/hards.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for row in reader:
                    Hard.objects.get_or_create(
                        spec_id=row[0],
                        name=row[1],
                        slug=row[2],
                        develop=row[3],
                        data_sc=row[4],
                        design=row[5],
                        manager=row[6],
                        marketing=row[7],
                    )
        except Exception:
            raise (
                "Ошибка при загрузке 'Направления специальности c Хард-скилом':"
            )
        return (
            "Загрузка 'Направления специальности c Хард-скилом' произошла успешно!"
            " Обработка файла hards.csv завершена."
        )
