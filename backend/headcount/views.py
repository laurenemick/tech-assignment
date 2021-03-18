import csv, io

from django.shortcuts import render
from django.contrib import messages
from django.db.models import Count

from .models import Company

# one parameter named request
def company_upload(request):
    # declaring template
    template = 'company_upload.html'
    data = Company.objects.all()

    # prompt is a context variable that can have different values depending on their context
    prompt = {
        'order': 'company, month, headcount',
        'companies': data    
            }
    # GET request returns the value of the data with the specified key
    if request.method == "GET":
        return render(request, template, prompt)

    csv_file = request.FILES['file']

    # check if it is a csv file
    if not csv_file.name.endswith('.csv'):
        messages.error(request, 'THIS IS NOT A CSV FILE')

    data_set = csv_file.read().decode('UTF-8')

    # setup a stream -- loop through each line we are able to handle
    io_string = io.StringIO(data_set)
    next(io_string)
    for column in csv.reader(io_string, delimiter=',', quotechar="|"):
        _, created = Company.objects.update_or_create(
            company=column[0],
            month=column[1],
            headcount=column[2],
        )

    context = {}

    return render(request, template, context)


def load_companies(request):
    companies = Company.objects.values('company').annotate(entries=Count('company'))

    return render(request, 'company_dropdown.html', {'companies': companies})