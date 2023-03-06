describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.
    contains('[data-testid=day]','Tuesday')
    .click()
    .should("has.class","day-list__item--selected");
  });
});