
import subprocess
import getpass

def AddPrinter(printer_name, driver_name, port_name):
    remote_computer = '192.168.206.139'
    username = 'Administrator'
    password = 'Aa123456'

    command = f'''
    Invoke-Command -ComputerName {remote_computer} -ScriptBlock {{
    # Add a new printer port
    Add-PrinterPort -Name '{port_name}' -PrinterHostAddress '{port_name}'

    # Add a new printer using that port
    Add-Printer -Name '{printer_name}' -PortName '{port_name}' -DriverName '{driver_name}'

    }} -Credential (New-Object PSCredential("{username}", (ConvertTo-SecureString "{password}" -AsPlainText -Force)))
'''
    
    # Run the powershell block
    result = subprocess.run(["powershell", "-Command", command], capture_output=True, text=True)

    # Check if the command was successful
    if result.returncode == 0:
        print(f"Printer '{printer_name}' added successfully.")
        return True
    else:
        print(f"Failed to add printer '{printer_name}'.")
        print("Error:", result.stderr)
        return False

def DeletePrinter(printer_name):
    remote_computer = '192.168.206.139'
    username = 'Administrator'
    password = 'Aa123456'

    command = f'''
    Invoke-Command -ComputerName {remote_computer} -ScriptBlock {{
    # Remove the specified printer
    Remove-Printer -Name '{printer_name}'

    # Optional: Remove the associated printer port (uncomment if needed)
    # Remove-PrinterPort -Name '{printer_name}'

    }} -Credential (New-Object PSCredential("{username}", (ConvertTo-SecureString "{password}" -AsPlainText -Force)))
'''
    
    # Run the powershell block
    result = subprocess.run(["powershell", "-Command", command], capture_output=True, text=True)

    # Check if the command was successful
    if result.returncode == 0:
        print(f"Printer '{printer_name}' deleted successfully.")
        return True
    else:
        print(f"Failed to delete printer '{printer_name}'.")
        print("Error:", result.stderr)
        return False

def AddDriver(driver_name, driver_path):
    remote_computer = '192.168.206.139'
    username = 'Administrator'
    password = 'Aa123456'

    command = f'''
    Invoke-Command -ComputerName {remote_computer} -ScriptBlock {{
        # Check if driver already exists
        $existing = Get-PrinterDriver -Name '{driver_name}' -ErrorAction SilentlyContinue
        if ($existing) {{
            Write-Output "Driver already exists"
            return $true
        }}

        # Add the printer driver
        # Note: This is a placeholder. You'll need to modify this based on your specific driver installation requirements
        # For example, you might need to use pnputil.exe or other commands specific to your printer drivers
        try {{
            Add-PrinterDriver -Name '{driver_name}' -ErrorAction Stop
            return $true
        }} catch {{
            Write-Error $_.Exception.Message
            return $false
        }}
    }} -Credential (New-Object PSCredential("{username}", (ConvertTo-SecureString "{password}" -AsPlainText -Force)))
'''
    
    result = subprocess.run(["powershell", "-Command", command], capture_output=True, text=True)
    return result.returncode == 0
