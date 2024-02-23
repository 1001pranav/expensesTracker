import { DETAILED_PIE, INCOME_EXPENSE } from "@/constant/graph.constant";
import { BillsTransaction, CategoryTransaction } from '@/components/transaction';
import {AddIncomeExpense, UpdateBills, UpdateCategory} from '@/components/popupForms';

import PieChart from "./graph/pieChart";
import BarChart from "./graph/barChart";
import TransactionTable from "./transaction";
import { Transaction } from "@/constant/interfaces";
import { ReactNode, useEffect, useRef, useState, RefObject } from "react";

export default function Dashboard(): ReactNode {
    const [isIncomeExpensePopupOpen, setIsAddPopupOpen] = useState(false);
    const [isCategoryUpdatePopupOpen, setIsCategoryUpdatePopupOpen] = useState(false);
    const [isBillsUpdatePopupOpen, setIsBillsUpdatePopupOpen] = useState(false);
    
    const incomeExpenseFormRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const updateCategoryFormRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const addBillsFormRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    
    // If esc is clicked then then close all the popups
    useEffect(()=> {
        const handleKeyDown = (event: any) => {
            if (event.keyCode === 27) {
                setIsAddPopupOpen(false);
                setIsCategoryUpdatePopupOpen(false);
                setIsBillsUpdatePopupOpen(false);
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, []);
    
    const barChartBillsLabel: string[]= ["foods", "health", "utils","Entertainment", "bills"];
    const expenseData: number[] = [25000, 13000, 12000, 13000, 15000];
    const incomeData: number[] = [50000, 45000, 15000, 16000, 15000];
    const transactions: Transaction[] = [
        { date:"10/12/2023", category: 'Food', amount: 50, type: 'expense' },
        { date: "5/12/2023", category: 'Salary', amount: 80, type: 'income' },
        { date: "9/12/2023", category: 'Transportation', amount: 900, type: 'expense' },
    ]
    return (
        <div >
            <div className='max-w-7xl mx-auto'>
            <div className="h-auto w-auto flex flex-row p-1 m-1 bg-gray-100">
                <button
                    className="text-black rounded-md hover:font-bold focus:font-bold focus:text-blue-700"
                    onClick={()=> setIsAddPopupOpen(true)}
                >
                    Add Income or Expense
                </button>
                <span className='px-1 font-bold'>/</span>
                <button
                    className="text-black rounded-md hover:font-bold focus:font-bold focus:text-blue-700"
                    onClick={()=> setIsCategoryUpdatePopupOpen(true)}
                >
                    Update Category
                </button>
                <span className='px-1 font-bold'>/</span>
                <button
                    className="text-black rounded-md hover:font-bold focus:font-bold focus:text-blue-700"
                    onClick={()=> setIsBillsUpdatePopupOpen(true)}
                >
                    Add or Update Bills
                </button>
                <span className='px-1 font-bold'>/</span>
            </div>
            <AddIncomeExpense isOpen={isIncomeExpensePopupOpen} onClose={() => setIsAddPopupOpen(false) } refObj={incomeExpenseFormRef}/>
            <UpdateCategory isOpen={isCategoryUpdatePopupOpen} onClose={() => setIsCategoryUpdatePopupOpen(false)} refObj={updateCategoryFormRef} />
            <UpdateBills isOpen={isBillsUpdatePopupOpen} onClose={() => setIsBillsUpdatePopupOpen(false)} refObj={addBillsFormRef}/>
        </div>
            <div className="flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
                    <PieChart
                        graphType="pie"
                        label={INCOME_EXPENSE.label}
                        titleText={INCOME_EXPENSE.titleText}
                        backgroundColor={INCOME_EXPENSE.backgroundColor}
                        data={[50, 60]}
                        id={INCOME_EXPENSE.id}
                    />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
                    <PieChart
                        graphType="doughnut"
                        label={DETAILED_PIE.label}
                        titleText={DETAILED_PIE.titleText}
                        backgroundColor={DETAILED_PIE.backgroundColor}
                        data={[40, 30, 60, 70, 80]}
                        id={DETAILED_PIE.id}
                    />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
                    <BarChart
                        graphType="bar"
                        label={barChartBillsLabel}
                        titleText="Income and Expense Categories"
                        backgroundColor={[]}
                        incomeBGColor={['rgba(24, 255, 19, 0.8)']}
                        expenseBGColor={['rgba(255, 153, 154, 0.8)']}
                        data={[]}
                        expenseData={expenseData}
                        incomeData={incomeData}
                        id="barGraph"
                    />
                </div>
            </div>
            <div className="flex flex-wrap">
            <div className="container mx-auto p-4">
                
                <h1 className="text-2xl font-bold mb-4 text-center">Transactions</h1>
                <TransactionTable Transactions={transactions} />
                </div>
            </div>
            <div className="flex flex-wrap mx-auto container p-4">
                
                <CategoryTransaction 
                        categories={[{
                            categoryName: "Food",
                            income: 500,
                            expense: 100
                        }, {
                            categoryName: "Entertainment",
                            income: 250,
                            expense: 100
                        }]}
                        tableHead='Income and expenses of All Categories'
                    />

                    <BillsTransaction 
                        bills={[
                            {
                                billsID: 0,
                                name: "Home Rent",
                                frequencies: 'MONTH',
                                amount: 10000,
                                description: "Monthly rent"
                            },
                            {
                                billsID: 1,
                                name: "Electricity",
                                frequencies: 'MONTH',
                                amount: 1000,
                                description: "Monthly electricity bills"
                            },
                        ]}
                        caption='Total Bills amounts'
                    />
                </div>
        </div>
    );
}