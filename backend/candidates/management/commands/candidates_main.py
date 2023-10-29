import csv

from django.core.management.base import BaseCommand

from candidates.models import Candidate


class CandidateLoadingError(BaseException):
    pass


class Command(BaseCommand):
    """Загрузка основных атрибутов кандидата в базу из csv файла:
    Фамилия, Имя, Отчество, Пол кандидата, Возраст,
    Телефон, Почта, Другой контакт, Статус соискателя, 
    Местоположение, Обо мне.
    который располагается в директории /data/... ."""
    def handle(self, *args, **kwargs):
        try:
            with open("data/candidates_main.csv", encoding="utf-8-sig") as f:
                reader = csv.reader(f)
                # contacts_phone,contacts_email,contacts_other,activity,location,about_me
                for row in reader:
                    Candidate.objects.get_or_create(last_name=row[0],
                                            first_name=row[1], 
                                            middle_name=row[2],
                                            sex=row[3],
                                            age=row[4],
                                            contacts_phone=row[6],
                                            contacts_email=row[7],
                                            contacts_other=row[8],
                                            activity=row[9],
                                            location=row[10],
                                            about_me=row[11],
                                            )
        except Exception:
            raise CandidateLoadingError(
                "Ошибка при загрузке 'Основных атрибутов кандидата'")
        return ("Загрузка 'Основных атрибутов кандидата!"
                " Обработка файла courses.csv завершена.")