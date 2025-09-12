  document.querySelectorAll('.status-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const parent = this.parentElement;
                    parent.querySelectorAll('.status-btn').forEach(b => {
                        b.style.fontWeight = 'normal';
                        b.style.border = 'none';
                    });
                    
                    this.style.fontWeight = 'bold';
                    this.style.border = '2px solid currentColor';
                    
                    // Если выбран статус Failed, можно показать форму создания баг-репорта
                    if (this.classList.contains('status-failed')) {
                        alert('Открытие формы создания баг-репорта...');
                    }
                });
            });