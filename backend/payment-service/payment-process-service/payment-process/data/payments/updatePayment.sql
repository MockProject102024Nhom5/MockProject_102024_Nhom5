UPDATE [dbo].[payments]
SET [residentId]=@residentId,
    [paymentDate]=@paymentDate,
    [paymentTypeId]=@paymentTypeId,
    [amount]=@amount,
    [paymentMethod]=@paymentMethod,
    [deflag]=@deflag
WHERE [paymentId]=@paymentId
