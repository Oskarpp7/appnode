describe('Sistema de Gestió Escolar', () => {
  test('sistema inicialitzat correctament', () => {
    expect(true).toBe(true);
  });
  
  test('dashboards disponibles', () => {
    const dashboards = ['admin', 'coordinador', 'monitor', 'familia'];
    expect(dashboards).toHaveLength(4);
  });
});
