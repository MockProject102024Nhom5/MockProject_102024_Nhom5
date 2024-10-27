UPDATE [dbo].[payments]
SET [residentId]=@residenId,
    [paymentDate]=@paymentDate,
    [paymentTypeId]=@paymentTypeId,
    [amount]=@amount,
    [paymentMethod]=@paymentMethod,
    [deflag]=@deflag
WHERE [paymentId]=@paymentId
