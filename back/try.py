import subprocess

# Define remote machine details
remote_host = '"192.168.206.136"'  # Hostname or IP address of the remote machine
username = 'Administrator'      # Username for authentication
password = 'Aa123456'      # Password for authentication

# PowerShell command string to open Notepad remotely
ps_command = '''
Add-PrinterPort -Name '1.1.1.1' -PrinterHostAddress '1.1.1.1'
Add-Printer -Name 'ori' -PortName '1.1.1.1' -DriverName 'Microsoft Print to PDF'
'''
ps_command1 = "msg * 'hello'"

# PowerShell script with Invoke-Command
powershell_script = f"""
$securePassword = ConvertTo-SecureString "{password}" -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential("{username}", $securePassword)
Invoke-Command -ComputerName {remote_host} -ScriptBlock {{
    {ps_command1}
}} -Credential $credential
"""

# Run the PowerShell command through subprocess
try:
    result = subprocess.run(['powershell.exe', '-Command', powershell_script], capture_output=True, text=True)
    print(result)
    if result.returncode == 0:
        print("Notepad opened successfully on the remote machine.")
    else:
        print(f"Error running PowerShell command: {result.stderr}")
except Exception as e:
    print(f"An error occurred: {e}")
