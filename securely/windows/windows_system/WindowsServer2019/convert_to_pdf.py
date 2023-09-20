from fpdf import FPDF

mof_path = r'N:\projects\Hackathons\kavach\windows\windows\windows_system\WindowsServer2019\CSBP_WindowsServer2019\localhost.mof'
pdf_path = r'N:\projects\Hackathons\kavach\windows\windows\windows_system\WindowsServer2019\CSBP_WindowsServer2019\localhost.pdf'

pdf = FPDF()
pdf.add_page()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.set_font("Arial", size=12)

with open(mof_path, 'r') as mof_file:
    for line in mof_file:
        pdf.cell(200, 10, txt=line, ln=True)

pdf.output(pdf_path)
