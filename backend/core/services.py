import io
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Image
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import getSampleStyleSheet
from tkinter import Canvas
from reportlab.pdfgen import canvas



from django.http import HttpResponse

from candidates.models import (
    Candidate,
    ExperienceDetailedInCandidate, 
    EducationInCandidate,
    Soft,
    WorkScheduleInCandidate,
    EmploymentTypeInCandidate,
    SoftsInCandidate,
    HardsInCandidate,
    CourseInCandidate,
    )



def candidate_resume_pdf(candidate_id):
    # Получение данных кандидата
    candidate = Candidate.objects.get(id=candidate_id)
    print(candidate)
    experience_in_candidate = ExperienceDetailedInCandidate.objects.filter(candidate=candidate)
    education_in_candidate = EducationInCandidate.objects.filter(candidate=candidate)
    workschedule_in_candidate = WorkScheduleInCandidate.objects.filter(candidate=candidate)
    employmenttype_in_candidate = EmploymentTypeInCandidate.objects.filter(candidate=candidate)
    softs_in_candidate = SoftsInCandidate.objects.filter(candidate=candidate)
    hards_in_candidate = HardsInCandidate.objects.filter(candidate_id=candidate)
    course_in_candidate = CourseInCandidate.objects.filter(candidate=candidate)

    
    pdfmetrics.registerFont(TTFont('Arial', 'arial.ttf'))
    # Создание документа PDF с правильной кодировкой
    doc = SimpleDocTemplate("resume.pdf", pagesize=letter, encoding='utf-8')
    elements = []

    # Отображение Шрифта для h2, h3 и вывода текста деталей кандидата
    styles = getSampleStyleSheet()
    russian_text_h2 = ParagraphStyle(
        name='RussianTextH2', 
        fontName='Arial', fontSize=24, leading=28)
    styles.add(russian_text_h2)
    russian_text_text = ParagraphStyle(
        name='RussianTextText', fontName='Arial', 
        fontSize=14, leading=16)
    styles.add(russian_text_text)
    russian_text_h3 = ParagraphStyle(
    name='RussianTextH3',
    fontName='Arial',
    fontSize=18,
    leading=22)
    styles.add(russian_text_h3)


    # Добавление заголовка ФИО кандидата
    styles = getSampleStyleSheet()
    russian_text_style = ParagraphStyle(name='RussianText', 
                                        fontName='Arial', fontSize=24, leading=28)
    elements.append(Paragraph(f"<h1>{candidate.last_name}" 
                              f" {candidate.first_name}"
                              f" {candidate.middle_name}"
                              f"</h1>",
                               russian_text_style))

    # Добавление фото
    elements.append(Spacer(1, 6))
    # elements.append(Image({candidate.image}))
    # for image_path in candidate.image:
    #     elements.append(Image(image_path))

    elements.append(Image(next(iter(candidate.image))))
    # elements.append(Paragraph(f"<img src='{candidate.image}' width='100' height='100'>", getSampleStyleSheet()['Normal']))


    # Добавление заголовка ФИО кандидата
    styles = getSampleStyleSheet()
    elements.append(Spacer(1, 6))
    elements.append(Paragraph(f"Телефон: {candidate.contacts_phone};"
                              f" @: {candidate.contacts_email};"
                              f" Другой контакт: {candidate.contacts_other};",
                               russian_text_text))

    # Добавление Направления
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("Направление", russian_text_h2))
    elements.append(Spacer(1, 6))
    elements.append(Paragraph(f"{candidate.specialization.name}", russian_text_text))
   

    # Добавление course
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("Курсы практикума", russian_text_h2))
    course = None
    if course_in_candidate:
        for course in course_in_candidate:
            elements.append(Spacer(1, 6))
            elements.append(Paragraph(f"{course.course.name}", russian_text_text))
            elements.append(Spacer(1, 6))
    else:
        elements.append(Paragraph("Хард скилы не найдены.", russian_text_text))

    # Добавление Уровня кандидата
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("Уровень", russian_text_h2))
    elements.append(Spacer(1, 6))
    elements.append(Paragraph(f"{candidate.level.name}", russian_text_text))

    # Добавление опыт работы(в годах)
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("Опыт", russian_text_h2))
    elements.append(Spacer(1, 6))
    elements.append(Paragraph(f"{candidate.experience.name}", russian_text_text))

    # Добавление hard skills
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("<h2>Навыки</h2>", russian_text_h2))
    hard = None
    if hards_in_candidate:
        for hard in hards_in_candidate:
            elements.append(Spacer(1, 6))
            elements.append(Paragraph(f"{hard.hards.name}", russian_text_text))
            elements.append(Spacer(1, 6))
    else:
        elements.append(Paragraph("Хард скилы не найдены.", russian_text_text))


    # Добавление experience_in_candidate
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("<h2>Опыт работы</h2>", russian_text_h2))
    experience = None
    if experience_in_candidate:
        for experience in experience_in_candidate:
            elements.append(Spacer(1, 6))
            elements.append(Paragraph(f"{experience.experience_detailed.date_start} - "
                                      f"{experience.experience_detailed.date_end}", 
                                    russian_text_text))
            elements.append(Spacer(1, 6))
            elements.append(Paragraph(f"{experience.experience_detailed.post}", 
                                      russian_text_h2))
            elements.append(Spacer(1, 6))
            elements.append(Paragraph(f"{experience.experience_detailed.responsibilities}", 
                                      russian_text_text))
            elements.append(Spacer(1, 6))
    else:
        elements.append(Paragraph("Опыта работы не указано.", russian_text_text))

    # Добавление education_in_candidate
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("<h2>Образование</h2>", russian_text_h2))
    education = None
    if education_in_candidate:
        for education in education_in_candidate:
            elements.append(Paragraph(f"{education.education.date_start} - "
                                      f"{education.education.date_graduation}", 
                                    russian_text_text))
            elements.append(Spacer(1, 6))
            elements.append(Paragraph(f"{education.education.education_level}", 
                                      russian_text_text))
            elements.append(Paragraph("<h3>Название вуза</h3>", russian_text_h3))
            elements.append(Paragraph(f"{education.education.name_university}", 
                                      russian_text_text))

            elements.append(Spacer(1, 6))
    else:
        elements.append(Paragraph("Образование не указано.", russian_text_text))
 

    # Генерация документа PDF
    doc.build(elements)

    # Возвращение PDF-документа в HttpResponse
    with io.open("resume.pdf", "rb") as f:
        response = HttpResponse(f.read(), 
                                content_type="application/pdf; charset=utf-8")
        response["Content-Disposition"] = "inline; filename=resume.pdf"
        return response
