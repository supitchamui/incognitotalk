// Unit Test (Sprint1) -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

describe('US2: แจ้งเตือนให้ผู้ใช้เปลี่ยนชื่อเมื่อ username ซ้ำ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
  
    it('TC1: หากชื่อ username มีชื่อซ้ำกับusernameที่ใช้งานอยู่ในระบบ ต้องไม่สามารถเข้าสู่หน้าต่อไปได้ และแจ้งเตือน"usernameซ้ำ กรุณาตั้งใหม่"', () => {
        const validUsername = 'testUsername';
  
        cy.get('input[name="username"]').type(validUsername);
        cy.get('button[name="Go"]').click();
        cy.url().should('include', '/home');
        cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
        cy.get('button[name="account"]').click();
        cy.get('.bg-borderColor').should('be.visible');
        cy.contains('button', 'Logout').click();

        cy.get('input[name="username"]').type(validUsername);
        cy.get('button[name="Go"]').click();
        cy.url().should('not.include', '/home');
        cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
        cy.contains('usernameซ้ำ กรุณาตั้งใหม่', { timeout: 4000 }).should('be.visible')

    })
  })
  
  describe('US3: ผู้ใช้สามารถตั้งชื่อ username เป็นภาษาไทยตามเงื่อนไขที่กำหนดไว้', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('TC1: หาก username มีช่องว่างหรืออักขระพิเศษ จะไม่สามารถกดเข้าสู่หน้าต่อไป', () => {
        const validUsername = 'test Username';
        cy.get('input[name="username"]').type(validUsername);
        cy.get('button[name="Go"]').click();
        cy.url().should('not.include', '/home');
        cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
    })
    it('TC2: สามารถตั้ง username เป็นภาษาไทย', () => {
        const validUsername = 'ชื่อผู้ใช้';
        cy.get('input[name="username"]').type(validUsername);
        cy.get('button[name="Go"]').click();
        cy.url().should('include', '/home');
        cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    })
    it('TC3: สามารถตั้ง username เป็นภาษาไทยและตัวเลข', () => {
        const validUsername = 'ชื่อผู้ใช้123';
        cy.get('input[name="username"]').type(validUsername);
        cy.get('button[name="Go"]').click();
        cy.url().should('include', '/home');
        cy.url().should('include', `username=${encodeURIComponent(validUsername)}`);
    })
    it('TC4: หาก username ไม่เกิน 13 ตัวอักษร จะสามารถเข้าสู่หน้าต่อไป', () => {
        const validUsername = '1234567890123';
        cy.get('input[name="username"]').type(validUsername);
        cy.get('button[name="Go"]').click();
        cy.url().should('not.include', '/home');
        cy.url().should('not.include', `username=${encodeURIComponent(validUsername)}`);
    })
    it('TC5: หาก user ไม่สามารถเข้าสู่หน้าต่อไปได้ จะแจ้งเตือนเงื่อนไขการตั้้งชื่อที่ถูกต้อง', () => {
        const lnvalidUsername = '1234567890123';
        cy.get('input[name="username"]').type(lnvalidUsername);
        cy.get('button[name="Go"]').click();
        cy.url().should('not.include', '/home');
        cy.url().should('not.include', `username=${encodeURIComponent(lnvalidUsername)}`);
        cy.contains('Username must contain only alphabet, number, Thai and not exceed 13 characters', { timeout: 4000 }).should('be.visible')
    })
  })