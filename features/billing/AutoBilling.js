// TODO Phase 2: Sistema facturació automàtica
// Càlcul €7.54 per assistència + despeses extres
// Generació PDF factures mensuals
// Integració pagaments SEPA

/**
 * AutoBilling System - Phase 2
 * 
 * Automatitza el procés de facturació basat en assistència diària
 * Integra amb sistema assistència per generar factures mensuals
 */
class AutoBilling {
  constructor() {
    this.pricePerAttendance = 7.54; // Preu base per assistència
    this.monthlyFees = {
      'lunch': 85.00,        // Menjador mensual
      'transport': 25.00,    // Transport escolar
      'activities': 15.00    // Activitats extres
    };
    this.taxRate = 0.21; // IVA 21%
  }
  
  /**
   * Calcula la factura mensual per un estudiant
   * @param {number} studentId - ID de l'estudiant
   * @param {string} month - Mes en format YYYY-MM
   * @param {Array} attendances - Llistat assistències del mes
   * @param {Array} extraServices - Serveis addicionals contractats
   * @returns {Object} Detall factura calculada
   */
  calculateMonthlyBill(studentId, month, attendances = [], extraServices = []) {
    // TODO: Implementar lògica càlcul real amb base de dades
    
    const attendanceCount = attendances.length;
    const attendanceCost = attendanceCount * this.pricePerAttendance;
    
    // Càlcul serveis addicionals
    let extraServicesCost = 0;
    extraServices.forEach(service => {
      if (this.monthlyFees[service.type]) {
        extraServicesCost += this.monthlyFees[service.type];
      }
    });
    
    // Subtotal abans impostos
    const subtotal = attendanceCost + extraServicesCost;
    
    // Aplicar descomptes si escau
    const discounts = this.calculateDiscounts(studentId, subtotal);
    const discountAmount = subtotal * (discounts.percentage / 100);
    
    // Subtotal després descomptes
    const subtotalAfterDiscount = subtotal - discountAmount;
    
    // Càlcul IVA
    const taxAmount = subtotalAfterDiscount * this.taxRate;
    
    // Total final
    const total = subtotalAfterDiscount + taxAmount;
    
    return {
      studentId,
      month,
      billing: {
        attendance: {
          count: attendanceCount,
          unitPrice: this.pricePerAttendance,
          total: attendanceCost
        },
        extraServices: extraServices.map(service => ({
          type: service.type,
          description: this.getServiceDescription(service.type),
          amount: this.monthlyFees[service.type] || 0
        })),
        subtotal,
        discounts: {
          description: discounts.description,
          percentage: discounts.percentage,
          amount: discountAmount
        },
        subtotalAfterDiscount,
        tax: {
          rate: this.taxRate,
          amount: taxAmount
        },
        total,
        currency: 'EUR'
      },
      generatedAt: new Date().toISOString(),
      dueDate: this.calculateDueDate(month),
      status: 'pending'
    };
  }
  
  /**
   * Genera factura PDF (integració futura amb jsPDF)
   * @param {Object} billData - Dades de la factura
   * @returns {Promise<Buffer>} PDF generat
   */
  async generateInvoicePDF(billData) {
    // TODO Phase 2: Implementar generació PDF amb jsPDF
    console.log('Generating PDF for bill:', billData.studentId);
    
    // Mock PDF generation
    return Promise.resolve({
      filename: `factura_${billData.studentId}_${billData.month}.pdf`,
      size: '234KB',
      generated: true
    });
  }
  
  /**
   * Processa pagament SEPA Direct Debit
   * @param {Object} billData - Dades factura
   * @param {Object} bankAccount - Dades compte bancari
   * @returns {Promise<Object>} Resultat processament
   */
  async processSEPAPayment(billData, bankAccount) {
    // TODO Phase 2: Integració real SEPA
    console.log('Processing SEPA payment for:', billData.total, 'EUR');
    
    // Mock SEPA processing
    return Promise.resolve({
      transactionId: `SEPA_${Date.now()}`,
      status: 'processed',
      amount: billData.billing.total,
      processedAt: new Date().toISOString(),
      expectedDebitDate: this.addDays(new Date(), 5)
    });
  }
  
  /**
   * Detecta factures vençudes i genera avisos
   * @returns {Promise<Array>} Llista avisos generats
   */
  async checkOverdueBills() {
    // TODO Phase 2: Implementar detector factures vençudes
    console.log('Checking overdue bills...');
    
    // Mock overdue detection
    return Promise.resolve([
      {
        billId: 'INV-2025-001',
        studentId: 123,
        familyEmail: 'familia@example.com',
        amount: 167.89,
        daysPastDue: 15,
        actionRequired: 'send_reminder'
      }
    ]);
  }
  
  /**
   * Exporta dades contables per software extern
   * @param {string} month - Mes a exportar
   * @param {string} format - Format: 'excel', 'csv', 'json'
   * @returns {Promise<Object>} Fitxer exportat
   */
  async exportAccountingData(month, format = 'excel') {
    // TODO Phase 2: Implementar exportació real
    console.log(`Exporting accounting data for ${month} in ${format} format`);
    
    return Promise.resolve({
      filename: `comptabilitat_${month}.${format}`,
      format,
      records: 45,
      totalAmount: 7589.32,
      generated: true
    });
  }
  
  // ========== HELPER METHODS ==========
  
  calculateDiscounts(studentId, subtotal) {
    // TODO: Implementar lògica descomptes personalitzada
    // - Família nombrosa: 10%
    // - Germà/germana: 5%
    // - Fidelitat (>2 anys): 5%
    
    return {
      description: 'Sense descomptes aplicables',
      percentage: 0
    };
  }
  
  getServiceDescription(serviceType) {
    const descriptions = {
      'lunch': 'Servei menjador escolar',
      'transport': 'Transport escolar',
      'activities': 'Activitats extraescolars'
    };
    return descriptions[serviceType] || 'Servei adicional';
  }
  
  calculateDueDate(month) {
    // Venciment: darrer dia del mes següent
    const [year, monthNum] = month.split('-');
    const dueDate = new Date(parseInt(year), parseInt(monthNum), 0); // Últim dia del mes següent
    return dueDate.toISOString().split('T')[0];
  }
  
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
  }
}

// Mock per testeig
const mockUsage = () => {
  const billing = new AutoBilling();
  
  // Exemple d'ús
  const mockAttendances = [
    { date: '2025-09-01', status: 'present' },
    { date: '2025-09-02', status: 'present' },
    { date: '2025-09-03', status: 'absent' },
    { date: '2025-09-04', status: 'present' }
  ];
  
  const mockExtraServices = [
    { type: 'lunch' },
    { type: 'transport' }
  ];
  
  const bill = billing.calculateMonthlyBill(
    123, // studentId
    '2025-09', // month
    mockAttendances.filter(a => a.status === 'present'),
    mockExtraServices
  );
  
  console.log('Mock Bill Generated:', bill);
};

// Export per ús en altre mòduls
module.exports = AutoBilling;

// Uncomment per testing
// mockUsage();
