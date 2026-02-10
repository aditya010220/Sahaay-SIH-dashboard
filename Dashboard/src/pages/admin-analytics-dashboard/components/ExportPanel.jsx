import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportPanel = () => {
  const [selectedReports, setSelectedReports] = useState([]);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('month');
  const [isExporting, setIsExporting] = useState(false);

  const getSelectedReportData = (ids = selectedReports) => {
    return reportTypes.filter(r => ids.includes(r.id)).map(r => {
      const sizeInKB = r.size.includes('MB') ? parseFloat(r.size) * 1024 : parseFloat(r.size);
      return {
        id: r.id,
        name: r.name,
        description: r.description,
        sizeKB: Math.round(sizeInKB),
      };
    });
  };

  const toCSV = (rows) => {
    const escape = (val) => {
      if (val === null || val === undefined) return '';
      const s = String(val);
      if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
      return s;
    };
    return rows.map(row => row.map(escape).join(',')).join('\r\n');
  };

  const downloadFile = (filename, content, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const getDateRangeLabel = () => {
    const range = dateRanges.find(r => r.value === dateRange);
    return range ? range.label : dateRange;
  };

  const reportTypes = [
    {
      id: 'stress-heatmap',
      name: 'Stress Level Heatmap',
      description: 'Campus-wide stress distribution by department and time',
      icon: 'Activity',
      size: '2.3 MB'
    },
    {
      id: 'mental-health-trends',
      name: 'Mental Health Trends',
      description: 'Appointment, assessment, and satisfaction trends over time',
      icon: 'TrendingUp',
      size: '1.8 MB'
    },
    {
      id: 'counselor-workload',
      name: 'Counselor Performance Report',
      description: 'Workload distribution, satisfaction scores, and capacity analysis',
      icon: 'Users',
      size: '1.2 MB'
    },
    {
      id: 'policy-recommendations',
      name: 'AI Policy Recommendations',
      description: 'Data-driven policy suggestions with implementation plans',
      icon: 'Lightbulb',
      size: '950 KB'
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment Summary',
      description: 'Anonymous risk percentages and intervention statistics',
      icon: 'Shield',
      size: '1.5 MB'
    },
    {
      id: 'resource-engagement',
      name: 'Resource Engagement Analytics',
      description: 'Usage statistics for digital resources and support tools',
      icon: 'BookOpen',
      size: '1.1 MB'
    }
  ];

  const exportFormats = [
    { value: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet' },
    { value: 'csv', label: 'CSV Data', icon: 'Database' },
    { value: 'powerpoint', label: 'PowerPoint Presentation', icon: 'Presentation' }
  ];

  const dateRanges = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'semester', label: 'This Semester' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleReportToggle = (reportId) => {
    setSelectedReports(prev => 
      prev?.includes(reportId) 
        ? prev?.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReports?.length === reportTypes?.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reportTypes?.map(report => report?.id));
    }
  };

  const handleExport = async () => {
    const ids = selectedReports.length > 0 ? selectedReports : reportTypes.map(r => r.id);
    if (ids.length === 0) return;
    setIsExporting(true);

    try {
      const selected = getSelectedReportData(ids);
      const exportedAt = new Date().toISOString();
      const rangeLabel = getDateRangeLabel();

      let actualFormat = exportFormat;
      let filename = `analytics-export-${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}`;

      if (exportFormat === 'csv' || exportFormat === 'excel') {
        const header = ['report_id','report_name','description','size_kb','date_range','exported_at'];
        const rows = [header, ...selected.map(r => [r.id, r.name, r.description, r.sizeKB, rangeLabel, exportedAt])];
        const csv = toCSV(rows);
        filename += '.csv';
        downloadFile(filename, csv, 'text/csv;charset=utf-8;');
      } else if (exportFormat === 'pdf' || exportFormat === 'powerpoint') {
        // Fallback: export CSV for unsupported formats in this frontend-only demo
        const header = ['report_id','report_name','description','size_kb','date_range','exported_at'];
        const rows = [header, ...selected.map(r => [r.id, r.name, r.description, r.sizeKB, rangeLabel, exportedAt])];
        const csv = toCSV(rows);
        filename += '.csv';
        actualFormat = 'csv';
        downloadFile(filename, csv, 'text/csv;charset=utf-8;');
      } else {
        const payload = { meta: { date_range: rangeLabel, exported_at: exportedAt }, reports: selected };
        filename += '.json';
        downloadFile(filename, JSON.stringify(payload, null, 2), 'application/json;charset=utf-8;');
        actualFormat = 'json';
      }

      alert(`Downloaded ${selected.length} report(s) as ${actualFormat.toUpperCase()}`);
    } catch (e) {
      console.error(e);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getTotalSize = () => {
    const selectedReportData = reportTypes?.filter(report => selectedReports?.includes(report?.id));
    const totalKB = selectedReportData?.reduce((total, report) => {
      const sizeInKB = report?.size?.includes('MB') 
        ? parseFloat(report?.size) * 1024 
        : parseFloat(report?.size);
      return total + sizeInKB;
    }, 0);
    
    return totalKB > 1024 ? `${(totalKB / 1024)?.toFixed(1)} MB` : `${totalKB?.toFixed(0)} KB`;
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Download" size={20} className="text-primary" />
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Export Analytics Reports
          </h2>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSelectAll}
          iconName={selectedReports?.length === reportTypes?.length ? "Square" : "CheckSquare"}
        >
          {selectedReports?.length === reportTypes?.length ? 'Deselect All' : 'Select All'}
        </Button>
      </div>
      {/* Report Selection */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-heading font-medium text-foreground">Select Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {reportTypes?.map((report) => (
            <div 
              key={report?.id}
              className={`border rounded-lg p-3 cursor-pointer gentle-transition ${
                selectedReports?.includes(report?.id) 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onClick={() => handleReportToggle(report?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded ${
                  selectedReports?.includes(report?.id) ? 'bg-primary text-white' : 'bg-muted'
                }`}>
                  <Icon name={report?.icon} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {report?.name}
                    </h4>
                    <span className="text-xs text-muted-foreground ml-2">
                      {report?.size}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {report?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Format Selection */}
        <div>
          <h3 className="text-sm font-heading font-medium text-foreground mb-3">Export Format</h3>
          <div className="space-y-2">
            {exportFormats?.map((format) => (
              <label key={format?.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="exportFormat"
                  value={format?.value}
                  checked={exportFormat === format?.value}
                  onChange={(e) => setExportFormat(e?.target?.value)}
                  className="text-primary focus:ring-primary"
                />
                <Icon name={format?.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{format?.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Selection */}
        <div>
          <h3 className="text-sm font-heading font-medium text-foreground mb-3">Date Range</h3>
          <div className="space-y-2">
            {dateRanges?.map((range) => (
              <label key={range?.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateRange"
                  value={range?.value}
                  checked={dateRange === range?.value}
                  onChange={(e) => setDateRange(e?.target?.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">{range?.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Export Summary */}
      {selectedReports?.length > 0 && (
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedReports?.length} report{selectedReports?.length !== 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-muted-foreground">
                Total size: {getTotalSize()} • Format: {exportFormat?.toUpperCase()} • Range: {dateRanges?.find(r => r?.value === dateRange)?.label}
              </p>
            </div>
            <Icon name="Package" size={20} className="text-primary" />
          </div>
        </div>
      )}
      {/* Export Button */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Exports download immediately. If no reports are selected, all will be exported.
        </p>

        <Button
          variant="default"
          onClick={handleExport}
          disabled={isExporting}
          loading={isExporting}
          iconName="Download"
          iconPosition="left"
        >
          {isExporting ? 'Generating...' : 'Export Reports'}
        </Button>
      </div>
    </div>
  );
};

export default ExportPanel;
