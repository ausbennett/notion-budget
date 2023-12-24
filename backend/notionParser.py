import json


def new_expense(database_id: str, date: str, name: str, category_id: str, amount: float, notes: str, receipt: str = None) -> str:
    """
    Creates a JSON structure for a new expense for the Notion API.

    Parameters:
    database_id (str): The ID of the Notion database.
    date (str): The date of the expense.
    name (str): The name of the expense.
    category (str): The category of the expense.
    amount (float): The amount of the expense.
    notes (str): Additional notes about the expense.
    receipt (str, optional): A link to the receipt.

    Returns:
    str: JSON string for the new expense.
    """
    data = {
        "parent": {
            "database_id": database_id
        },
        "properties": {
            "date": {
                "date": {
                    "start": date
                }
            },
            "name": {
                "title": [
                    {
                        "text": {
                            "content": name
                        }
                    }
                ]
            },
            "category": {
                "relation": [
                    {
                        "id": category_id
                    }
                ]
            },
            "amount": {
                "number": amount
            },
            # Assuming 'notes' is a property in your Notion database
            "notes": {
                "rich_text": [
                    {
                        "text": {
                            "content": notes
                        }
                    }
                ]
            }
            # Include 'receipt' property if necessary
        }
    }

    return data
