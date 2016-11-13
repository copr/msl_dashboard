from django import forms

class RokForm(forms.Form):
	rok = forms.IntegerField(label="rok")
	