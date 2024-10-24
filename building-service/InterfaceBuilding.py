from flask import Flask, render_template, request, redirect 
from DatabaseBuilding import view_contract_details, view_contracts, add_contract

app = Flask(__name__)

@app.route('/')
def index():
    contracts = view_contracts()
    return render_template('index.html', contracts=contracts) 

@app.route('/contract/<int:id>')
def contract_detail(id):
    contract = view_contract_details(id)
    return render_template('contract_detail.html', contract=contract)

@app.route('/add_contract', methods=['GET', 'POST'])
def add_contract_page():
    if request.method == 'POST':
        company_name = request.form['company_name']
        contact_name = request.form['contact_name']
        start_date = request.form['start_date']
        end_date = request.form['end_date']
        status = request.form['status']
        special_terms = request.form['special_terms']
        provider_id = request.form['provider_id']
        add_contract(company_name, contact_name, start_date, end_date, status, special_terms, provider_id)
        return redirect('/')
    return render_template('add_contract.html')

if __name__ == '__main__':
    app.run(debug=True)
