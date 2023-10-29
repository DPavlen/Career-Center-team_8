from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    """Запуск всех указанных команд кандидата."""

    def handle(self, *args, **options):
        call_command("add_courses")
        call_command("add_employ")
        call_command("add_exp")
        call_command("add_specs")
        call_command("add_hards_cand")
        call_command("add_hards")
        call_command("add_levels")
        call_command("add_schedule")
        call_command("add_softs")
        call_command("add_education")
        call_command("add_exp_detail")
    