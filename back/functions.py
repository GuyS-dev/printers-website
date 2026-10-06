import winrm
import json

REMOTECOMPUTER = 'localhost'
USERNAME = ''
PASSWORD = ''

def RunRemoteScript(script):
    try:
        session = winrm.Session(
            f'http://{REMOTECOMPUTER}:5985/wsman',
            auth=(USERNAME, PASSWORD),
            transport='ntlm'
        )
        result = session.run_ps(script)
        if result.status_code == 0:
            return result.std_out.decode().strip()
        else:
            print("Remote script error:", result.std_err.decode())
            return "[]"
    except Exception as e:
        print("WinRM exception:", e)
        return "[]"

def AddPrinter(printer_name, driver_name, port_name):
    script = f'''
        if (-not (Get-PrinterPort -Name '{port_name}' -ErrorAction SilentlyContinue)) {{
            Add-PrinterPort -Name '{port_name}' -PrinterHostAddress '{port_name}'
        }}
        Add-Printer -Name '{printer_name}' -PortName '{port_name}' -DriverName '{driver_name}'
    '''
    output = RunRemoteScript(script)
    return "Exception" not in output

def DeletePrinter(printer_name):
    script = f'''
        if (Get-Printer -Name '{printer_name}' -ErrorAction SilentlyContinue) {{
            Remove-Printer -Name '{printer_name}'
        }}
    '''
    output = RunRemoteScript(script)
    return "Exception" not in output
