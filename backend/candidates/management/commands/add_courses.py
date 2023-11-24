import csv

from django.core.management.base import BaseCommand

from candidates.models import Course


class Command(BaseCommand):
    """Загрузка 'Курсов Яндекса' в базу из csv файла,
    который располагается в директории /data/... ."""

    def handle(self, *args, **kwargs):
        try:
            with open("data/courses.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                for spec_id, name, slug in reader:
                    Course.objects.get_or_create(
                        spec_id=spec_id, name=name, slug=slug
                    )
        except Exception:
            raise ("Ошибка при загрузке 'Курсов Яндекса':")
        return (
            "Загрузка 'Курсов Яндекса' произошла успешно!"
            " Обработка файла courses.csv завершена."
        )
