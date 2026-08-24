# Prompt user for port name and printer name
$portName = Read-Host "Enter the port name"
$printerName = Read-Host "Enter the printer name"

# Get credentials from Windows Credential Manager
$targetName = "192.168.206.139"
$credential = Get-StoredCredential -Target $targetName

# Check if credentials were found
if ($null -eq $credential) {
    Write-Error "Credentials for $targetName not found in Windows Credential Manager"
}

# Execute the remote command with the provided input
Invoke-Command -ComputerName $targetName -ScriptBlock {
    param($port, $printer)
    
    # Add a new printer port
    Add-PrinterPort -Name $port -PrinterHostAddress $port
    
    # Add a new printer using that port
    Add-Printer -Name $printer -PortName $port -DriverName 'Microsoft Print to PDF'
    
    Write-Output "Printer '$printer' added successfully using port '$port'"
} -ArgumentList $portName, $printerName -Credential $credential